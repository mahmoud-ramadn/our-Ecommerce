import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

const ProtededRoute = ({children}:{children:React.ReactNode}) => {
    const { accessToken } = useAppSelector(state => state.auth)
    if (!accessToken) {
        return <Navigate to='/login?message=login_required'/>
    }
  return (
      <div>{children}</div>
  )
}

export default ProtededRoute