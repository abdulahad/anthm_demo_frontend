const apiFetch = (
  apiUrl,
  apiMethod,
  apiHeader,
  apiBody,
  auth = true,
  dispatchAction = false
) => {
  return fetch(`${apiUrl}`, {
    method: apiMethod,
    headers: apiHeader,
    body: JSON.stringify(apiBody),
  })
    .then((res) => {
      console.log(res)
      if (res.status>=500) {
        return res.text().then((err) => {
          throw new Error(JSON.stringify({ errResponse: res, errText: err }));
        });
      }else if(!res.ok){
        return {
          error:true,
          status:res.status,
          res
        }
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err, apiUrl, apiMethod, apiHeader);
    });
};
export { apiFetch };
