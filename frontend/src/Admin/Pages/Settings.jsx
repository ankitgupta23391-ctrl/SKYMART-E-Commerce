import React, { useState } from "react";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";

import {
  FaStore,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaLock,
  FaLanguage,
  FaMoneyBill,
  FaShoppingCart
} from "react-icons/fa";

function Settings() {
  const [payment, setPayment] = useState(true);
  const [notification, setNotification] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [autoOrder, setAutoOrder] = useState(true);

  const Toggle = ({ value, setValue }) => (

    <button
      onClick={() => setValue(!value)}

      className={`
w-14
h-7
rounded-full
transition
${value ? "bg-blue-600" : "bg-gray-300"}
`}
    >

      <div
        className={`
w-5
h-5
bg-white
rounded-full
m-1
transition
${value ? "translate-x-7" : ""}
`}
      />

    </button>
  )

  return (
    <div className="flex min-h-screen bg-slate-100 ml-15 mt-25">

      <AdminSidebar />

      <div className="w-full ml-64">

        <AdminHeader />

        <div className="p-6">

          <h1 className="
text-3xl
font-bold
mb-6
">

            Store Settings

          </h1>

          {/* Store Banner */}

          <div className="
bg-blue-600
p-6
rounded-3xl
text-white
mb-6
shadow
">

            <div className="flex items-center gap-5">

              <div className="
w-24
h-24
bg-white
text-blue-600
rounded-2xl
flex
items-center
justify-center
text-4xl
">

                <FaStore />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  My Ecommerce Store
                </h2>
                <p>
                  Manage your online store
                </p>
              </div>
            </div>
          </div>

          <div className="
grid
lg:grid-cols-3
gap-6
">
            {/* General */}

            <div className="
lg:col-span-2
bg-white
rounded-2xl
shadow
p-6
">

              <h2 className="
text-xl
font-bold
mb-5
">
                General Information

              </h2>

              <div className="
grid
md:grid-cols-2
gap-5
">

                <Input
                  icon={<FaStore />}
                  label="Store Name"
                  value="My Ecommerce Store"
                />

                <Input
                  icon={<FaEnvelope />}
                  label="Email"
                  value="admin@gmail.com"
                />

                <Input
                  icon={<FaPhone />}
                  label="Phone"
                  value="+91 9876543210"
                />

                <Input
                  icon={<FaGlobe />}
                  label="Website"
                  value="www.store.com"
                />

                <div className="md:col-span-2">
                  <label className="font-medium">
                    Address
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt
                      className="
absolute
top-4
left-4
text-gray-400
"
                    />
                    <textarea
                      rows="4"
                      placeholder="Store Address"
                      className="
w-full
border
rounded-xl
p-3
pl-12
"
                    />
                  </div>
                </div>
              </div>

              <button
                className="
mt-6
bg-blue-600
text-white
px-8
py-3
rounded-xl
"
              >
                Save Changes
              </button>

            </div>

            {/* Right Cards */}

            <div className="space-y-5">

              <Card
                icon={<FaCreditCard />}
                title="Online Payment"
              >

                <Toggle
                  value={payment}
                  setValue={setPayment}
                />
              </Card>

              <Card
                icon={<FaBell />}
                title="Email Notification"
              >

                <Toggle
                  value={notification}
                  setValue={setNotification}
                />

              </Card>

              <Card
                icon={<FaShoppingCart />}
                title="Auto Order Accept"
              >

                <Toggle
                  value={autoOrder}
                  setValue={setAutoOrder}
                />

              </Card>

              <Card
                icon={<FaLock />}
                title="Maintenance Mode"
              >

                <Toggle
                  value={maintenance}
                  setValue={setMaintenance}
                />
              </Card>
              <Card
                icon={<FaMoneyBill />}
                title="Currency"
              >
                <select
                  className="
border
rounded-lg
px-3
py-2
"
                >
                  <option>
                    INR ₹
                  </option>
                  <option>
                    USD $
                  </option>
                </select>
              </Card>
              <Card
                icon={<FaLanguage />}
                title="Language"
              >

                <select
                  className="
border
rounded-lg
px-3
py-2
"
                >
                  <option>
                    English
                  </option>
                  <option>
                    Hindi
                  </option>
                </select>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ icon, label, value }) {
  return (
    <div>
      <label className="font-medium">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-4 text-gray-400">

          {icon}
        </span>

        <input
          readOnly
          value={value}
          className="w-full border rounded-xl p-3 pl-12" />
      </div>
    </div>
  )
}
function Card({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <span className="text-blue-600">
          {icon}
        </span>
        <h3 className="font-semibold">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}
export default Settings;