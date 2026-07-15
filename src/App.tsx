import { useEffect } from "react";
import { AppRouter } from "./AppRouter";
import { useAppDispatch } from "./store/hooks";
import { initializeAuthThunk } from "./store/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeAuthThunk());
  }, [dispatch]);
  return <AppRouter />;
}

export default App;
