import { useEffect, useState } from "react";
import { AppRouter } from "./AppRouter";
import { useAppDispatch } from "./store/hooks";
import { initializeAuthThunk } from "./store/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkTokens = async (): Promise<void> => {
      try {
        await dispatch(initializeAuthThunk()).unwrap();
      } finally {
        setIsLoading(false);
      }
    };
    checkTokens();
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return <AppRouter />;
}

export default App;
