import  { useEffect, useState } from 'react'
import { bookBaseUrl } from "../../axiosinstance"
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {

  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id: ""
  });

  const [bookLists, setBookLists] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllbokksList = async () => {
    try {

      const { data } = await bookBaseUrl.get("/booklists");

      setBookLists(data?.bookLists);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllbokksList();
  }, []);

  const handleFormChange = (e) => {

    const { name, value } = e.target;

    setBookForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {

    try {

      if (!isUpdating) {

        if (
          !bookForm?.BookName ||
          !bookForm.BookTitle ||
          !bookForm.Author ||
          !bookForm.SellingPrice
        ) {

          alert('All fields data required!');
          return;
        }

        const { data } = await bookBaseUrl.post("/addbook", bookForm);

        if (data?.success) {

          alert(data?.Message);

          getAllbokksList();

          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            Id: "",
          })
        }

      } else {

        const { data } = await bookBaseUrl.put("/updatebook", bookForm);

        if (data?.success) {

          alert(data?.Message);

          getAllbokksList();

          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            Id: ""
          })

          setIsUpdating(false);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {

    try {

      const { data } = await bookBaseUrl.post("/deletebook", {
        Id: id,
      });

      if (data?.success) {

        alert(data?.Message);

        getAllbokksList();
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = (data) => {

    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      Id: data?._id,
    })

    setIsUpdating(true);
  }

  return (

    <div className='w-full px-5 min-h-[calc(100vh-60px)]'>

      <div className='w-full grid grid-cols-5 gap-3 my-5'>

        <div className='w-full flex flex-col gap-2'>

          <label>Book Name:</label>

          <input
            type='text'
            placeholder='Book Name'
            className='w-full border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 p-2'
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />

        </div>

        <div className='w-full flex flex-col gap-2'>

          <label>Book Title:</label>

          <input
            type='text'
            placeholder='Book Title'
            className='w-full border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 p-2'
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />

        </div>

        <div className='w-full flex flex-col gap-2'>

          <label>Author:</label>

          <input
            type='text'
            placeholder='Author'
            className='w-full border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 p-2'
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />

        </div>

        <div className='w-full flex flex-col gap-2'>

          <label>Selling Price:</label>

          <input
            type='text'
            placeholder='Selling Price'
            className='w-full border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 p-2'
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />

        </div>

        <div className='w-full flex flex-col gap-2'>

          <label>Publish Date:</label>

          <input
            type='date'
            className='w-full border-gray-100 rounded-sm outline-1 outline-gray-500 h-8 p-2'
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />

        </div>

      </div>

      <div className='w-full flex justify-end'>

        <button
          onClick={handleSubmit}
          className='border-2 border-black bg-gray-600 text-white rounded-md px-2 py-1 cursor-pointer'
        >
          SUBMIT
        </button>

      </div>

      <div className='w-full mt-10'>

        <div className='w-full'>

          <table className='w-full bg-white divide-y divide-gray-200'>

            <thead className='bg-gray-400'>

              <tr>

                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Book Name
                </th>

                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Book Title
                </th>

                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Author
                </th>

                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Selling Price
                </th>

                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Publish Date
                </th>

                <th className='tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Action
                </th>

              </tr>

            </thead>

            <tbody className='bg-white divide-y divide-gray-200'>

              {
                bookLists?.map((book, index) => {

                  return (

                    <tr className='hover:bg-gray-200' key={index}>

                      <td className='px-6 py-3 whitespace-nowrap'>
                        {book?.BookName}
                      </td>

                      <td className='px-6 py-3 whitespace-nowrap'>
                        {book?.BookTitle}
                      </td>

                      <td className='px-6 py-3 whitespace-nowrap'>
                        {book?.Author}
                      </td>

                      <td className='px-6 py-3 whitespace-nowrap'>
                        {book?.SellingPrice}
                      </td>

                      <td className='px-6 py-3 whitespace-nowrap'>
                        {book?.PublishDate}
                      </td>

                      <td className='px-6 py-3 whitespace-nowrap'>

                        <div className='w-20 flex justify-center gap-5'>

                          <div
                            onClick={() => handleDelete(book._id)}
                            className='h-8 w-8 flex justify-center items-center text-red-600 text-lg cursor-pointer'
                          >
                            <span>
                              <MdDelete />
                            </span>
                          </div>

                          <div
                            onClick={() => handleUpdate(book)}
                            className='h-8 w-8 flex justify-center items-center text-green-600 text-lg cursor-pointer'
                          >
                            <span>
                              <FaPen />
                            </span>
                          </div>

                        </div>

                      </td>

                    </tr>
                  )
                })
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Home