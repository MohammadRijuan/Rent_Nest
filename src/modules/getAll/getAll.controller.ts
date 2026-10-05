import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { getAllServices } from "./getAll.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status";

const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllServices.getAllCategoryService();

    sendResponse(res, {
      success: true,
      message: "Categories retrieved successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);

// const getAllProperties = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await getAllServices.getAllPropertiesService();

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "All properties retrieved successfully",
//       data: result,
//     });
//   },
// );

// way of getting all property with filter

const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await getAllServices.getAllPropertiesService(
      req.query as {
        location?: string;
        minPrice?: string;
        maxPrice?: string;
        type?: string;
        page?: string;
        limit?: string;
      },
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All properties retrieved successfully",
      data: result,
    });
  },
);

// getting property by id

const getPropertyById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const propertyId = req.params.id;

    if (!propertyId) {
      throw new Error("property id required in params");
    }

    const result = await getAllServices.getPropertyByIdService(
      propertyId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: " single property retrieved successfully",
      data: result,
    });
  },
);

// renatls

const createRentals = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const payload = req.body;

    const rental = await getAllServices.createRentalService(
      payload,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental request created successfully",
      data: rental,
    });
  },
);

const getRentals = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const payload = req.body

    const allRentals = await getAllServices.getRentalsService();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All rental fetched successfully",
      data: allRentals,
    });
  },
);

// get rental by id
const getRentalById = catchAsync(
  async (req: Request, res: Response) => {

    const rentalId = req.params.id
    const result = await getAllServices.getRentalByIdService(
      rentalId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental fetched successfully",
      data: result,
    });
  },
);



// create review
const createReview = catchAsync(async (req: Request, res: Response) => {

  const payload = req.body;
  const userId = req.user?.id

  const result = await getAllServices.createReviewService(
    payload,
    userId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

export const getAllControllers = {
  getAllCategory,
  getAllProperties,
  getPropertyById,
  createRentals,
  getRentals,
  getRentalById,
  createReview
};
