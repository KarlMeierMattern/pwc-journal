import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const about = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/1`
    );
    const data = await response.json();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

export { about };
