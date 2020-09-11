import psutil


def getData():
    cpu_info = {
        'cpu': 0,
        'memory': 0,
        'disk': 0,
        'cores_fisicos': 0,
        'cores_virtual': 0,
        'clock': 0
    }
    cpu = psutil.cpu_percent(interval=1, percpu=True)
    cpu_media = sum(cpu)/len(cpu)
    memory = (psutil.virtual_memory().used >> 30)
    memory_percent = (psutil.virtual_memory().percent)
    disk = psutil.disk_usage('/').percent
    cores_fisicos = psutil.cpu_count(logical=False)
    cores_virtual = psutil.cpu_count()
    clock = round(psutil.cpu_freq().current/1000, 1)

    cpu_info['cpu'] = round(cpu_media, 1)
    cpu_info['memory'] = memory
    cpu_info['memory_percent'] = memory_percent
    cpu_info['disk'] = disk
    cpu_info['cores_fisicos'] = cores_fisicos
    cpu_info['cores_virtual'] = cores_virtual
    cpu_info['clock'] = clock

    # Objeto para visualização só
    print(cpu_info)
    # lista para envio no banco
    data = (round(cpu_media, 1), memory, memory_percent,
            disk, cores_fisicos, cores_virtual, clock)

    return data
