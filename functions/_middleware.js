export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "week1-public.pages.dev") {
    url.hostname = "kpopeats.cc";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
