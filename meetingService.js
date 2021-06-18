import http from "./httpService";
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);

  }
  return http.post(apiEndPoint, movie);
}
export function deleteMeeting(meeting) {
  console.log(meeting);
  return http.delete(meeting._links.self.href);
}