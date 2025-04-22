import { toast } from 'react-toastify';
export const handleApiError = async (error) => {
  let message = 'An error occurred! Please try again.';
  if (error.response) {
    if (error.response.data.message.includes('connect ETIMEDOUT')) {
      message = 'Network Issue! Check your internet connection.';
    } else message = error.response.data.message || 'Something went wrong.';
  } else if (error.request) {
    message =
      'Server is unresponsive. Kindly attempt your request again after sometime.';
  } else message = 'Network Issue! Check your internet connection.';
  toast.error(message);
};
