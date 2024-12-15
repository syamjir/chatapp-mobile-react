import useWindowSize from "../hooks/useGetWindowSize";

function PageNotFound() {
  const handleGoBack = () => {
    // this component is used outside the router context.
    window.history.go(-1);
  };
  const message = {
    mobileView: "The page you are looking for could not be found 😢",
    desktopView:
      "This app is work only in mobile view.Please adjust your screen to mobile view 📱",
  };
  const windowSize = useWindowSize();
  const onMessage =
    windowSize <= 768 ? message.mobileView : message.desktopView;

  return (
    <main className="h-screen bg-gray-100 flex items-center justify-center p-12">
      <div className="bg-white border border-gray-200 rounded-md p-12 text-center max-w-4xl">
        {onMessage === message.mobileView ? (
          <h1 className="mb-8 text-xl ">{onMessage}</h1>
        ) : (
          <h1 className="text-xl ">{onMessage}</h1>
        )}
        {onMessage === message.mobileView && (
          <button
            onClick={() => handleGoBack()}
            className="px-3 py-1 bg-main text-stone-100 rounded-md text-lg"
          >
            &larr; Go back
          </button>
        )}
      </div>
    </main>
  );
}

export default PageNotFound;
