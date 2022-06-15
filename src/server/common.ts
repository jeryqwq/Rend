export async function uploadImg (file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return  await fetch('/lease-center/appfile/upload', {
    method: 'post',
    body: formData
  }).then((res) => res.json())
}
