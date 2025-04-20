export const handleApiError = async (error) => {
  let message = 'An error occurred! Please try again.';
  // if (error.response) {
  //   alert(error.response.data.message || 'An error occurred!');
  // } else {
  //   alert(`Network Issue! Check your network connection.`);
  // }
  if (error.response) {
    message = error.response.data.message || 'Something went wrong.';
  } else if (error.request) {
    message = 'No response from server. Please try again later.';
  } else message = 'Network Issue! Check your internet connection.';
  console.log(message);
  alert(message);
};
