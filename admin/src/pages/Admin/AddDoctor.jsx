import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {


  const [docImg, setDocImg] = useState(false)
  const [name, setname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('Select')
  const [fee, setFee] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('Select')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log("Form submitted");

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }
      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fee', Number(fee))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      // console log FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setname('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFee('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className="max-w-10xl mx-auto bg-white p-8 rounded-xl shadow-lg shadow-primary/50 space-y-6 mt-8">

      <p className="text-3xl font-semibold text-center text-gray-700">Add Doctor</p>

      <div className="space-y-5">
        {/* <!-- Image Upload Section --> */}
        <div className="flex items-center gap-5">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" className="w-24 h-24 object-cover rounded-full border-2 border-primary shadow-md shadow-primary/20" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-gray-600">Upload doctor picture</p>
        </div>

        {/* <!-- Form Input Fields --> */}
        <div className="grid grid-cols-2 gap-6">
          {/* <!-- Left Column --> */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500">Doctor Name</label>
              <input onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-500">Doctor Email</label>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-500">Doctor Password</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-500">Experience</label>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Select">Select</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Fees</label>
              <input onChange={(e) => setFee(e.target.value)} value={fee} type="number" placeholder="Fees" required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          {/* <!-- Right Column --> */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500">Speciality</label>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Select">Select</option>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Education</label>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm text-gray-500">Address</label>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="w-full border border-gray-300 rounded-lg p-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* <!-- About Doctor --> */}
        <div>
          <label className="block text-sm text-gray-500">About Doctor</label>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder="Write about doctor" rows={5} required className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        {/* <!-- Submit Button --> */}
        <button type="submit" className="bg-primary text-white w-full py-3 rounded-lg text-lg font-semibold shadow-md shadow-primary/40 hover:bg-primary-dark transition">
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor