/* eslint-disable react/prop-types */
export function ResponseMessage({ message, err }) {
  return (
    <div className={`status-message ${err ? "error" : "success"}`}>
      {err ? err : message}
    </div>
  );
}
