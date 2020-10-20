import mysql.connector


class Mysql:
    def __init__(self, user, password, host, database):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.mysql = None
        self.cursor = None

    #Estabelecendo uma conexão
    def connect(self):
        try:
            self.mysql = mysql.connector.connect(
            user=self.user, password=self.password, host=self.host, database=self.database)
            #Criando cursor para manipulação do banco.
            print(self.mysql)
            self.cursor = self.mysql.cursor()
        except Exception as err:
            print(err)
            raise

    def insert(self, data):
        query = (
                "insert into tbLeitura(dataHoraLeitura, dadoLeitura, fkServidorLeitura, fkComponente)"
                "values (%s, %s, 1, 102)"
            # "INSERT INTO dados_cap(nome_maq, placa_m, clock, temperatura, ram_use)"
            # "VALUES (%s, %s, %s, %s, %s)"
        )
        values = data
        try:
            print('Inserindo Valores de Clock')
            self.cursor.execute(query,values)
            self.mysql.commit()
        except Exception as err:
            print(err)
            self.mysql.rollback()
            self.close()
    
    def insertRam(self, data):
        query = (
                "insert into tbLeitura(dataHoraLeitura, dadoLeitura, fkServidorLeitura, fkComponente)"
                "values (%s, %s, 1, 104)"
        )
        values = data
        try:
            print('Inserindo Valores de Ram')
            self.cursor.execute(query,values)
            self.mysql.commit()
        except Exception as err:
            print(err)
            self.mysql.rollback()
            self.close()
    
    def insertTemperatura(self, data):
        query = (
                "insert into tbLeitura(dataHoraLeitura, dadoLeitura, fkServidorLeitura, fkComponente)"
                "values (%s, %s, 1, 103)"
        )
        values = data
        try:
            print('Inserindo Valores de Temperatura')
            self.cursor.execute(query,values)
            self.mysql.commit()
        except Exception as err:
            print(err)
            self.mysql.rollback()
            self.close()
    
    # Fechando conexão
    def close(self):
        self.mysql.close()

        


