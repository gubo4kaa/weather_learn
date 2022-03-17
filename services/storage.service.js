import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'


const filePath = join(homedir(), 'weather-data.json')


const saveKeyValue = async (key, value) => {
	const data = {}
	if(await isExist(filePath)) {
		const file = await promises.readFile(filePath)
		data = JSON.parse(file)
	}

	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data))
}


export { saveKeyValue }
