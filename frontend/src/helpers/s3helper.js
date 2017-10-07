import { IMAGE_BUCKET_URL } from 'config/aws'

export const getNewestImageUri = () => {
	return fetch(IMAGE_BUCKET_URL)
	.then(response => response.text())
	.then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
	.then(xml => xml.getElementsByTagName('Contents'))
	.then(htmlContentsCollection => [].slice.call(htmlContentsCollection))
	.then(contentsArray => contentsArray.map(item => IMAGE_BUCKET_URL + '/' + item.childNodes[0].innerHTML))
	.then(unsortedImageArray => unsortedImageArray.sort((a, b) => b - a))
	.then(sortedImageArray => sortedImageArray[0])
}
