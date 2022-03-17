import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
	console.log(chalk.bgRed('ERROR') + ' ' + error) 
}

const printSuccess = (message) => {
	console.log(chalk.bgGreen('SUCCESS') + ' ' + error) 
}

const printHelp = () =>{
	console.log(
		dedent(`${chalk.bgCyan('HELP')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-р для вывода помощи
		-t [API_KEY] для сохранения токена
		`)
	)
}

export {printError, printSuccess, printHelp}