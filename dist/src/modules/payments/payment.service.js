import config from "../../config";
import { prisma } from "../../lib/prisma";
const createPaymentService = async (payload, userId) => {
    const { rental_id } = payload;
    const rental = await prisma.rental.findUnique({
        where: {
            id: rental_id,
        },
        include: {
            property: true,
            tenant: true,
        },
    });
    if (!rental) {
        throw new Error("Rental request not found");
    }
    if (rental.tenant_id !== userId) {
        throw new Error("You are not allowed to pay for this rental");
    }
    if (rental.status !== "APPROVED") {
        throw new Error("only approved rentals can be paid");
    }
    const existingPayment = await prisma.payment.findFirst({
        where: {
            rental_id: rental.id,
            status: {
                in: ["PENDING", "SUCCESS"],
            },
        },
    });
    if (existingPayment) {
        throw new Error("Payment already exists for this rental");
    }
    const amount = Number(rental.property.rent);
    if (amount <= 0) {
        throw new Error("Invalid rental amount");
    }
    const transactionId = `Rent - ${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const paymentData = new URLSearchParams({
        store_id: config.ssl_store_id,
        store_passwd: config.ssl_store_password,
        total_amount: amount.toString(),
        currency: "BDT",
        tran_id: transactionId,
        success_url: `${config.app_url}/api/payments/confirm`,
        fail_url: `${config.app_url}/api/payments/confirm`,
        cancel_url: `${config.app_url}/api/payments/confirm`,
        product_name: rental.property.titles,
        product_category: "Rental",
        product_profile: "general",
        cus_name: rental.tenant.name,
        cus_email: rental.tenant.email,
        shipping_method: "NO",
        num_of_item: "1",
        value_a: rental.id,
    });
    const response = await fetch(`${config.ssl_base_url}/gwprocess/v4/api.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: paymentData,
    });
    if (!response.ok) {
        throw new Error("Failed to connect with sslcommerz");
    }
    const sslResponse = await response.json();
    if (!sslResponse.GatewayPageURL) {
        throw new Error(sslResponse.failedreason || "Failed to create SSLCOMMERZ payment session");
    }
    const payment = await prisma.payment.create({
        data: {
            rental_id: rental.id,
            tenant_id: userId,
            amount,
            transaction: transactionId,
            method: "SSLCOMMERZ",
            status: "PENDING",
        },
    });
    // 13. Return only required information
    return {
        paymentId: payment.id,
        transactionId,
        amount,
        gatewayUrl: sslResponse.GatewayPageURL,
    };
};
const confirmPaymentService = async (payload) => {
    const { tran_id, val_id } = payload;
    if (!tran_id) {
        throw new Error("Transaction ID is missing");
    }
    if (!val_id) {
        throw new Error("Validation ID is missing");
    }
    // Find our payment
    const payment = await prisma.payment.findUnique({
        where: {
            transaction: tran_id,
        },
        include: {
            rental: true,
        }
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    // Already successful
    if (payment.status === "SUCCESS") {
        return payment;
    }
    // this part is crucial from starting here to ->
    // Ask SSLCOMMERZ to validate the transaction
    const validationUrl = new URL(`${config.ssl_base_url}/validator/api/validationserverAPI.php`);
    validationUrl.searchParams.set("val_id", val_id);
    validationUrl.searchParams.set("store_id", config.ssl_store_id);
    validationUrl.searchParams.set("store_passwd", config.ssl_store_password);
    validationUrl.searchParams.set("format", "json");
    const response = await fetch(validationUrl);
    if (!response.ok) {
        throw new Error("Failed to connect with SSLCOMMERZ validation API");
    }
    const validationResponse = await response.json();
    // Check SSLCOMMERZ status
    if (validationResponse.status !== "VALID" &&
        validationResponse.status !== "VALIDATED") {
        await prisma.payment.update({
            where: {
                id: payment.id,
            },
            data: {
                status: "FAILED",
            },
        });
        throw new Error("Payment validation failed");
    }
    // Check transaction ID
    if (validationResponse.tran_id !== payment.transaction) {
        throw new Error("Transaction ID does not match");
    }
    // Check amount
    if (Number(validationResponse.amount) !== Number(payment.amount)) {
        throw new Error("Payment amount does not match");
    }
    // Check currency
    if (validationResponse.currency !== "BDT") {
        throw new Error("Payment currency does not match");
    }
    // ending here is crucial part.... because we are not validating payment manually now, sslcommerz make it validated automatically
    // Everything is valid
    const updatedPayment = await prisma.payment.update({
        where: {
            id: payment.id,
        },
        data: {
            status: "SUCCESS",
        },
    });
    await prisma.property.update({
        where: {
            id: payment.rental.property_id,
        },
        data: {
            status: "RENTED",
        },
    });
    return updatedPayment;
};
// get users payment history
const getPaymentsService = async (userId) => {
    const payments = await prisma.payment.findMany({
        where: {
            tenant_id: userId,
        },
        omit: {
            tenant_id: true,
            rental_id: true,
        },
        include: {
            rental: {
                select: {
                    id: true,
                    status: true,
                    property: {
                        select: {
                            id: true,
                            titles: true,
                            location: true,
                        },
                    },
                    tenant: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return payments;
};
// get payment by id
const getPaymentByIdService = async (paymentId, userId) => {
    const payment = await prisma.payment.findUnique({
        where: {
            id: paymentId,
        },
        omit: {
            tenant_id: true,
            rental_id: true,
        },
        include: {
            rental: {
                select: {
                    id: true,
                    status: true,
                    property: {
                        select: {
                            id: true,
                            titles: true,
                            location: true,
                        },
                    },
                    tenant: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    if (!payment) {
        throw new Error("Payment not found");
    }
    if (payment.rental.tenant.id !== userId) {
        throw new Error("You are not allowed to view this payment");
    }
    return payment;
};
export const paymentsServices = {
    createPaymentService,
    confirmPaymentService,
    getPaymentsService,
    getPaymentByIdService,
};
//# sourceMappingURL=payment.service.js.map