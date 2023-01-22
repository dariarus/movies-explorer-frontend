// export function getResponseData<T>(res: Response): Promise<T> {
//   if (!res.ok) {
//     return res.text().then(text => {
//       throw new Error(text)
//     })
//   }
//   return res.json();
// }

export async function getResponseData<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return res.json().then((err) => {
      throw new Error(err.message);
    })
  }
  return res.json();
}