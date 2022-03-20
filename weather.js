#!/usr/bin/env node
import{ getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
	if(!token.length) {
		printError('Не передан token')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('Токен сохранён')
	} catch(e) {
		printError('error',e)
	}
}

const getForcast = async() => {
	try {
		const weather = await getWeather('moscow')
		console.log(weather)
	} catch(e) {
		if(e?.response?.status == 404) {
			printError('Неверно указан город')
		} else if(e?.response?.status == 401) {
			printError('Неверно указан токен')
		} else {
			printError(e.message)
		}
	}
	
}


const initCLI = () => {
	const args = getArgs(process.argv)
	
	if (args.h) {
		printHelp()
	}
	if (args.s) {
		//сохранить город
	}
	if (args.t) {
		return saveToken(args.t)
		//сохранить токен
	}
	getForcast()

	// вывести погоду
}

initCLI()