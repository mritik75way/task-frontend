import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Result, Button } from "antd";

const GlobalError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Result
        title={error.status}
        subTitle={
          typeof error.data === "string"
            ? error.data
            : (error.data?.message ?? "Something went wrong")
        }
        extra={[
          <Button
            key="home"
            type="primary"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </Button>,
        ]}
      />
    );
  }

  if (error instanceof Error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle={error.message}
        extra={[
          <Button
            key="reload"
            type="primary"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>,
        ]}
      />
    );
  }

  return (
    <Result
      status="500"
      title="500"
      subTitle="Unexpected application error"
      extra={[
        <Button
          key="reload"
          type="primary"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>,
      ]}
    />
  );
};

export default GlobalError;
