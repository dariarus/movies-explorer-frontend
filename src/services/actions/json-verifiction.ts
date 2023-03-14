export function getResponseData<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return res.json().then((err) => {
      throw new Error(err.message);
    })
  }
  return res.json();
}