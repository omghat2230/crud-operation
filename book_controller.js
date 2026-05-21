const { Book } = require('../model/book_model');

const hadleBookStoreController = async (req, res) => {
  try {

    const body = req.body;

    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice
    ) {

      return res.status(400).json({
        message: "All field data required!",
        success: false
      });
    }

    const bookAdd = await Book.create(body);

    if (bookAdd) {

      return res.status(201).json({
        message: "Data created successfully!",
        success: true,
        Id: bookAdd?._id
      });
    }

  } catch (error) {

    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

const hadleBookListController = async (req, res) => {

  try {

    const bookList = await Book.find({});

    return res.status(200).json({
      Message: "All books fetched successfully",
      success: true,
      TotalCount: bookList.length,
      bookLists: bookList
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

const hadleBookDeleteController = async (req, res) => {

  try {

    const body = req.body;

    const deleted = await Book.deleteOne({
      _id: body.Id
    });

    if (deleted.acknowledged) {

      return res.status(200).json({
        Message: "Book deleted successfully",
        success: true,
      });
    }

  } catch (error) {

    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

const hadleBookUpdateController = async (req, res) => {

  try {

    const body = req.body;

    const updating = await Book.updateOne(
      { _id: body?.Id },
      { $set: body }
    );

    if (updating?.acknowledged) {

      return res.status(200).json({
        Message: "Book updated successfully",
        success: true,
      });
    }

  } catch (error) {

    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

module.exports = {
  hadleBookStoreController,
  hadleBookListController,
  hadleBookDeleteController,
  hadleBookUpdateController
};