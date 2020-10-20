from services.mysql import Mysql
from pythohms import envTemperatura, envClock, envRam
import time

#Inserir user, password, host, database
mysql = Mysql('mario','mario03122000', 'localhost', 'monitoramento')

mysql.connect()

while True:
    # values = envDados()
    # mysql.insert(values)
    if (envClock()):
        valuesClock = envClock()
        mysql.insert(valuesClock)

    if (envRam()):
        valuesRam = envRam()
        mysql.insertRam(valuesRam)

    if (envTemperatura()):
        valuesTemperatura = envTemperatura()
        mysql.insertTemperatura(valuesTemperatura)
    time.sleep(2)





