import { IMAGE_BUCKET_URL } from '../config/aws'
import DOMParser from 'react-native-html-parser'

const parser = new DOMParser.DOMParser()

export const getNewestImageUri = () => fetch(IMAGE_BUCKET_URL)
	.then(response => response.text())
	.then(str => parser.parseFromString(str, 'text/xml'))
	.then(xml => xml.getElementsByTagName('Contents'))
	.then(htmlContentsCollection => Array.prototype.slice.call(htmlContentsCollection))
	.then(contentsArray => contentsArray.map(item => `${IMAGE_BUCKET_URL}/${item.childNodes[0].firstChild.data}`))
	.then(unsortedImageArray => unsortedImageArray.sort((a, b) => b - a))
	.then(sortedImageArray => sortedImageArray[0])
	.catch(err => console.log(err))
