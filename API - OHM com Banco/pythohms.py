import requests
import json
import time

class CrawlerOpenHardwareMonitor:
    def __init__(self):
        self.url = 'http://localhost:8085/data.json'
        self.data = None
    
    def getJsonData(self):
        response = requests.get(self.url)
        data = json_data = response.json()
        self.data = data
    
    def getInfo(self):
        self.getJsonData()
        info = {
            "Desktop": None,
            "MotherBoard": None,
            "CPU": [],
            "Memory": {
                "Load": None,
                "Use": None,
                'Available': None
            },
            "VideoCard": None,
            "AllDevices": []
        }

        clocks = []
        temperatures = []
        loads = []
        
        data = self.data

        for i in data['Children']:
            info['Desktop'] = i['Text']
            for desktop in i['Children']:
                if desktop['id'] <= 2:
                    info['MotherBoard'] = desktop['Text']
                if desktop['Text'].find('Generic Hard Disk') < 0:
                    info['AllDevices'].append(desktop['Text'])
                #CPU
                if desktop['Text'].find('Intel') >= 0 or desktop['Text'].find('AMD') >= 0:
                    for cpu_metrics in desktop['Children']:
                        #clock
                        if cpu_metrics['Text'] == 'Clocks':
                            for clock in cpu_metrics['Children']:
                                if clock['Text'].find('CPU') >= 0:
                                    clocks.append(clock['Value'])
                        #temperature
                        if cpu_metrics['Text'] == 'Temperatures':
                            for temps in cpu_metrics['Children']:
                                if temps['Text'].find('CPU') >= 0:
                                    temperatures.append(temps['Value'])
                        #load
                        if cpu_metrics['Text'] == 'Load':
                            for load in cpu_metrics['Children']:
                                if load['Text'].find('CPU') >= 0:
                                    loads.append(load['Value'])
                #Memory
                if desktop['Text'].find('Generic Memory') >= 0 or desktop['Text'].find('Memory') >= 0:
                    for cpu_metrics in desktop['Children']:
                        #Load
                        if cpu_metrics['Text'] == 'Load':
                            for memory in cpu_metrics['Children']:
                                if memory['Text'] == 'Memory':
                                    info['Memory']['Load'] = memory['Value']
                        #Use
                        if cpu_metrics['Text'] == 'Data':
                            for memory in cpu_metrics['Children']:
                                if memory['Text'] == 'Used Memory':
                                    info['Memory']['Use'] = memory['Value']
                                if memory['Text'] == 'Available Memory':
                                    info['Memory']['Available'] = memory['Value']

            for index, itens in enumerate(clocks):
                cpu = {
                    'Name': f'Core {index + 1}',
                    "Clock": clocks[index],
                    "Temperature": temperatures[index],
                    "Load": loads[index]
                }
                info['CPU'].append(cpu)
            return info

# def envDados():
#     teste =  CrawlerOpenHardwareMonitor()   
#     dados = teste.getInfo()
#     nome_maq = dados["Desktop"]
#     placa_m = dados["MotherBoard"]
#     cpus = dados["CPU"]
#     n_cores = len(cpus)
#     mem = dados["Memory"]
#     placa_video = dados["VideoCard"]
#     dispositivos = dados["AllDevices"]
#     horario = time.strftime('%Y-%m-%d %H:%M:%S')

#     # data = (nome_maq, placa_m, cpus[0]["Clock"], cpus[0]["Temperature"], mem["Use"])

#     data = (nome_maq, placa_m, float(cpus[0]["Clock"].replace(',','.').replace('MHz','')), 
#         float(cpus[0]["Temperature"].replace(',','.').replace('°C','')), 
#         float(mem["Use"].replace(',','.').replace('GB','')))

    
#     return data

def envClock():
    teste =  CrawlerOpenHardwareMonitor()   
    dados = teste.getInfo()
    horario = time.strftime('%Y-%m-%d %H:%M:%S')
    cpus = dados["CPU"]
    dataClock = (horario, float(cpus[0]["Clock"].replace(',','.').replace('MHz','')))

    return dataClock

def envRam():
    teste =  CrawlerOpenHardwareMonitor()   
    dados = teste.getInfo()
    horario = time.strftime('%Y-%m-%d %H:%M:%S')
    mem = dados["Memory"]
    dataRam = (horario, float(mem["Use"].replace(',','.').replace('GB','')))

    return False

def envTemperatura():
    teste =  CrawlerOpenHardwareMonitor()   
    dados = teste.getInfo()
    horario = time.strftime('%Y-%m-%d %H:%M:%S')
    cpus = dados["CPU"]
    dataRam = (horario, float(cpus[0]["Temperature"].replace(',','.').replace('°C','')))

    return dataRam
    
print("Pegando", envRam())

# print(dados)

        # Consultas
        # print(cpus[0]["Name"])
        # print(cpus[0])
        # print(n_cores)
        # print(mem["Use"])
        # print(dados)