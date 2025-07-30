export function NCTIframe(props) {
  return (
    <div className="relative h-0 overflow-hidden pt-[56.25%]">
      {/* <iframe
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="YouTube video player"
        {...props}
      /> */}
      {/* <iframe className="absolute inset-0 w-full h-full" frameBorder="0" allowFullScreen {...props} /> */}
      {/* eslint-disable-next-line react/iframe-missing-sandbox */}
      <iframe className="absolute inset-0 w-full h-full" frameBorder="0" allowFullScreen allow="autoplay" {...props} />
    </div>
  );
}
