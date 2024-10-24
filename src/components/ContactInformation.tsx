


const ContactInformation = () => {
    return (
        <div className="pb-8 pt-16 lg:pt-24 lg:pb-12">
            <div className="px-4 mx-auto max-w-screen-xl w-full">
                <div className="flex flex-col lg:flex-row items-center max-lg:gap-5">
                    <div className="flex flex-col gap-6 w-full lg:w-[50%]">
                        <h3 className="text-2xl font-medium text-[#111]">Contact Information</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <p className="text-base text-[#0057b8] font-normal">ADDRESS:</p>
                                <p className="text-base text-[#111] font-normal">Sankipara, Mymensingh City</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-base text-[#0057b8] font-normal">EMAIL US:</p>
                                <p className="text-base text-[#111] font-normal">vaccinemanagement@gmail.com</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-base text-[#0057b8] font-normal">PHONE:</p>
                                <p className="text-base text-[#111] font-normal">+8801740786762</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col gap-6 lg:pl-20 lg:border-l lg:border-gray-300 w-full lg:w-[50%]">
                        <h3 className="text-2xl font-medium text-[#111]">Opening Hours</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <p className="text-base text-[#111] font-normal">Saturday– Thursday</p>
                                <p className="text-base text-[#111] font-normal">8.00 AM – 8.00 PM</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-base text-[#111] font-normal">Saturday– Thursday</p>
                                <p className="text-base text-[#111] font-normal">10.00 AM – 10.00 PM</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-base text-[#111] font-normal">Sunday</p>
                                <p className="text-base text-[#111] font-normal">8.00 PM – 03.00 PM</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default ContactInformation