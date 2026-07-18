import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  FaBox,
  FaCog,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import { getSingleOrder } from "../../service/order";


function TrackOrder() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    if (id) {
      fetchOrder();
    }

  }, [id]);




  const fetchOrder = async () => {

    try {

      const res = await getSingleOrder(id);


      if (res?.data?.success) {

        setOrder(res.data.order);

      }
      else {

        toast.error("Order not found");

      }


    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to fetch order"
      );

    }
    finally {

      setLoading(false);

    }

  };





  const steps = [

    {
      title: "Order Placed",
      icon: <FaBox />
    },

    {
      title: "Processing",
      icon: <FaCog />
    },

    {
      title: "Shipped",
      icon: <FaTruck />
    },

    {
      title: "Delivered",
      icon: <FaCheckCircle />
    }

  ];





  const getStatusIndex = () => {

    switch (order?.orderStatus) {

      case "Processing":
        return 1;

      case "Shipped":
        return 2;

      case "Delivered":
        return 3;

      default:
        return 0;

    }

  };



  const statusIndex = getStatusIndex();






  if (loading) {

    return (
      <>
        <Navbar />

        <div className="
        min-h-screen
        flex
        justify-center
        items-center
        ">

          <h1 className="text-3xl font-bold">
            Loading...
          </h1>

        </div>

        <Footer />
      </>
    )

  }





  if (!order) {

    return (

      <>
        <Navbar />

        <div className="
        min-h-screen
        flex
        justify-center
        items-center
        ">

          <h1 className="text-3xl font-bold">
            Order Not Found
          </h1>

        </div>

        <Footer />

      </>

    )

  }





  return (

    <>


      <Navbar />


      <section className="
    min-h-screen
    bg-slate-100
    py-12
    px-6
    ">


        <div className="
      max-w-6xl
      mx-auto
      mt-20
      ">



          <h1 className="
      text-4xl
      font-bold
      mb-2
      ">

            Track Your Order

          </h1>



          <p className="
      text-gray-500
      mb-10
      ">

            Order ID :
            <span className="font-semibold ml-2">

              {order._id}

            </span>

          </p>





          {/* TRACKING TIMELINE */}


          <div className="
      bg-white
      rounded-3xl
      shadow
      p-8
      ">


            <div className="
      flex
      items-center
      justify-between
      relative
      ">



              {
                steps.map((step, index) => (


                  <React.Fragment key={index}>


                    <div className="
          flex
          flex-col
          items-center
          z-10
          ">


                      <div className={`
            w-16
            h-16
            rounded-full
            flex
            items-center
            justify-center
            text-xl

            ${index <= statusIndex
                          ?
                          "bg-green-500 text-white"
                          :
                          "bg-gray-200 text-gray-500"
                        }

            `}>

                        {step.icon}

                      </div>



                      <h3 className={`
            mt-3
            font-bold
            text-center

            ${index <= statusIndex
                          ?
                          "text-green-600"
                          :
                          "text-gray-400"
                        }

            `}>

                        {step.title}

                      </h3>



                      <p className="text-sm text-gray-500">

                        {
                          index <= statusIndex
                            ?
                            "Completed"
                            :
                            "Pending"
                        }

                      </p>



                    </div>





                    {
                      index !== steps.length - 1 &&

                      <div className={`
            flex-1
            h-1
            mx-3

            ${index < statusIndex
                          ?
                          "bg-green-500"
                          :
                          "bg-gray-300"
                        }

            `}>

                      </div>

                    }





                  </React.Fragment>


                ))
              }



            </div>





            {/* DETAILS */}


            <div className="
      border-t
      mt-10
      pt-8
      grid
      md:grid-cols-3
      gap-8
      ">



              {/* ADDRESS */}

              <div>

                <h2 className="
        text-xl
        font-bold
        mb-3
        ">
                  Delivery Address
                </h2>


                <p>
                  {order.shippingAddress?.name}
                </p>


                <p>
                  {order.shippingAddress?.phone}
                </p>


                <p>
                  {order.shippingAddress?.address}
                </p>


                <p>

                  {order.shippingAddress?.city}
                  -
                  {order.shippingAddress?.pincode}

                </p>


              </div>





              {/* PAYMENT */}


              {/* PAYMENT */}


              <div>


                <h2 className="
  text-xl
  font-bold
  mb-3
  ">
                  Payment
                </h2>



                <p>

                  Method :

                  <span className="font-semibold ml-2">

                    {order.paymentMethod}

                  </span>

                </p>




                <p>

                  Status :

                  <span
                    className={`
      font-semibold
      ml-2

      ${order.orderStatus === "Delivered" ||
                        order.paymentStatus === "Paid"

                        ?

                        "text-green-600"

                        :

                        "text-orange-500"

                      }

      `}
                  >

                    {

                      order.orderStatus === "Delivered"

                        ?

                        "Paid"

                        :

                        order.paymentStatus

                    }


                  </span>


                </p>



              </div>





              {/* TOTAL */}


              <div>


                <h2 className="
        text-xl
        font-bold
        mb-3
        ">
                  Total Amount
                </h2>



                <h1 className="
        text-3xl
        font-bold
        text-green-600
        ">

                  ₹
                  {
                    order.totalAmount?.toLocaleString()
                  }

                </h1>


              </div>



            </div>



          </div>




        </div>


      </section>



      <Footer />


    </>

  )

}


export default TrackOrder;