export function isDevEnv() {
  return process.env.NODE_ENV === "development";
}

export const ContainerSize = () => {
  if (!isDevEnv()) {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 z-50 w-full">
      <div className="@container flex items-center justify-end">
        <p className="mt-3 mr-3 grid h-8 w-8 place-items-center rounded-sm bg-green-500 text-center text-sm text-white">
          <span className="block @sm:hidden">xs</span>
          <span className="hidden @sm:block @md:hidden">sm</span>
          <span className="hidden @md:block @lg:hidden">md</span>
          <span className="hidden @lg:block @xl:hidden">lg</span>
          <span className="hidden @xl:block @2xl:hidden">xl</span>
          <span className="hidden @2xl:block @3xl:hidden">2xl</span>
          <span className="hidden @3xl:block @4xl:hidden">3xl</span>
          <span className="hidden @4xl:block @5xl:hidden">4xl</span>
          <span className="hidden @5xl:block @6xl:hidden">5xl</span>
          <span className="hidden @6xl:block @7xl:hidden">6xl</span>
          <span className="hidden @7xl:block">7xl</span>
        </p>
      </div>
    </div>
  );
};

export const TwScreenSize = () => {
  if (!isDevEnv()) {
    return null;
  }

  return (
    <div className="fixed right-3 bottom-3 grid h-8 w-8 place-items-center rounded-sm bg-red-500 text-white">
      <p style={{ fontSize: "16px" }}>
        <span className="sm:hidden">xs</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="hidden 2xl:block">2xl</span>
      </p>
    </div>
  );
};
