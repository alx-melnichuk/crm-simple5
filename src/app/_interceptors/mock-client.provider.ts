import { ClientDto } from '../lib-client/_interfaces/client-dto.interface';

export class MockClientProvider {

  private clientList: ClientDto[] = this.createList();

  constructor() {
  }

  // ** Public API **

  public getDtoList(data: { ids: number[], emails: string[], hasContract: boolean, isRealClient: boolean }): ClientDto[] {
    let result: ClientDto[] = this.clientList.slice();
    if (Array.isArray(data.ids) && data.ids.length > 0) {
      result = result.filter(item => data.ids.length === 0 || data.ids.includes(item.id));
    }
    if (Array.isArray(data.emails) && data.emails.length > 0) {
      result = result.filter(item => data.emails.includes(item.email));
    }
    if (data.hasContract != null) {
      result = result.filter(item => item.hasContract === data.hasContract);
    }
    if (data.isRealClient) {
      result = result.filter(item => item.isRealClient === data.isRealClient);
    }
    return result;
  }

  public getDto(id: number): ClientDto {
    let result = null;
    const clone: ClientDto[] = this.clientList.slice();
    if (id != null) {
      const data = clone.filter(item => item.id === id);
      if (data.length > 0) {
        result = data[0];
      }
    }
    return result;
  }

  public delete(data: { ids: number[] }): string {
    if (Array.isArray(data.ids)) {
      for (const id of data.ids) {
        const index = this.clientList.findIndex(item => item.id === id);
        if (index > -1) {
          this.clientList.splice(index, 1);
        }
      }
    }
    return null;
  }

  // ** Privat API **

  private createList(): ClientDto[] {
    const result: ClientDto[] = [];
    result.push(this.createClient(1, 'Petrenko', 'Igor', 'Mikhailovich'));
    result.push(this.createClient(2, 'Pushkin', 'Sergey', 'Petrovich'));
    result.push(this.createClient(3, 'Gasanov', 'Ibrahim', 'Sultanovich'));
    result.push(this.createClient(4, 'Ivanov', 'Petr', 'Vasilievich'));
    result.push(this.createClient(5, 'Ahmadulin', 'Pavel', 'Konstantinovich'));
    result.push(this.createClient(6, 'Kosatin', 'Luka', 'Ivanovic'));
    result.push(this.createClient(7, 'Vayzev', 'Stanislav', 'Vladimirovich'));
    result.push(this.createClient(8, 'Freeman', 'Martin', ''));
    result.push(this.createClient(9, 'Lundin', 'Arno', ''));
    result.push(this.createClient(10, 'Suhorucov', 'Semyon', 'Ignatievich'));
    result.push(this.createClient(11, 'Asputin', 'Artur', 'Vitalievich'));
    result.push(this.createClient(12, 'Lourens', 'Nikus', ''));
    result.push(this.createClient(13, 'Rudolph', 'Valentino', ''));
    result.push(this.createClient(14, 'Krajevec', 'Donji', ''));
    result.push(this.createClient(15, 'Westbrook', 'Jimi', ''));
    result.push(this.createClient(16, 'Fitzgerald', 'Larry', ''));
    result.push(this.createClient(17, 'Hendrix', 'Jimi', ''));
    return result;
  }


  private multiplicityByTwo(id: number, value1: string, value2: string): string {
    return (id % 2 === 0 ? value1 : value2);
  }

  private multiplicityByThree(id: number, value1: string, value2: string, value3: string): string {
    return (id % 3 === 0 ? value1 : this.multiplicityByTwo(id, value2, value3));
  }

  private createClient(id: number, surname: string, name: string, patronymic: string): ClientDto {
    const id2 = id + 1;
    return {
      id,
      surname,
      name,
      patronymic,
      email: surname + '@gmail.com',
      phone: '(' + this.multiplicityByThree(id, '050', '098', '062') + ')'
        + ((this.multiplicityByThree(id, '113', '409', '320')) + id * 3) + '-'
        + (this.multiplicityByThree(id, '12', '19', '32') + (id + 2) * 3) + '-'
        + (15 + id * 3)
      ,
      source: (id % 3 === 0 ? 'acquaintances' : 'internet'),
      city: (id % 3 === 0 ? 'New Jersey' : (id % 2 === 0 ? 'Georgia' : 'Oregon')),
      webSite: (id2 % 3 === 0 ? 'New Jersey' : (id2 % 2 === 0 ? 'Georgia' : 'Oregon')),
      hasContract: (id % 3 === 0 ? true : false),
      description: 'Description by ' + surname + ' ' + name + '.',
      message: '',
      interest: '',
      preference: '',
      howFound: (id % 3 === 0 ? '' : 'web site'),
      isRealClient: (id % 3 === 0 ? true : false),
      payment: (id2 % 3 === 0 ? 'cash' : (id2 % 2 === 0 ? 'notcash' : 'cash/notcash')),
    };
  }

}
