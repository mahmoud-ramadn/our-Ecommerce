import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { useState } from "react";

type TStatus="idle"|"checking"|"available"|"notAvailbale"|"failed"

const useCheckEmailAvailbility = () => {
    const [emailAvailabilityStatus, setEmailAvailbilityStatus] = useState<TStatus>("idle");

    const [enteredEmail, setEnteredEmail] = useState<null|string>(null);
     
    const CheckEmailAvailbility = async (email:string) => {
        setEnteredEmail(email)
        setEmailAvailbilityStatus('checking')

    try {
        const res = await axios.get(`/users?email=${email}`);
        if (!res.data.length) {
            setEmailAvailbilityStatus('available')
        } else {
            setEmailAvailbilityStatus('notAvailbale')

        }


    } catch (error) {
        setEmailAvailbilityStatus('failed')
        axiosErrorHandler(error)
    }
}

    const restCheckEmailAvailabiliity = () => {
        setEmailAvailbilityStatus('idle');
        setEnteredEmail(null)
    }


return { CheckEmailAvailbility,enteredEmail,emailAvailabilityStatus ,restCheckEmailAvailabiliity}
}

export default useCheckEmailAvailbility