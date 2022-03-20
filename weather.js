#!/usr/bin/env node
import{ getArgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY, } from './services/storage.service.js'

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

const saveCity = async (city) => {
	if(!city.length) {
		printError('Не передан город')
		return
	}
	try{
		await getWeather(city)
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess('Город сохранён')
	} catch(e) {
		if(e?.response?.status == 404) {
			printError('Неверно указан город')
		} else {
			printError(e)
		}
	}
	
}

const getForcast = async () => {
	try {
		const city = await getKeyValue(TOKEN_DICTIONARY.city)
		const weather = await getWeather(city)
		await printWeather(weather, getIcon(weather.weather[0].icon))
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
		return printHelp()
	}
	if (args.s) {
		//сохранить город
		return saveCity(args.s)
	}
	if (args.t) {
		return saveToken(args.t)
		//сохранить токен
	}
	getForcast()
	
	// вывести погоду
}

initCLI()