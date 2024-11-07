// API for adding doctor

const addDoctor = async (req, res) => {
    console.log("Request", req.body)
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const image = req.file

        console.log({ name, email, password, speciality, degree, experience, about, fees, address }, image)

    } catch (error) {
        console.log("Error", error)
    }
}


export { addDoctor }