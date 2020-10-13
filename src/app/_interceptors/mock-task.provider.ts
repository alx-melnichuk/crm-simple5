import { TaskDto } from '../lib-task/_interfaces/task-dto.interface';

export class MockTaskProvider {

  private taskList: TaskDto[] = this.createList();

  constructor() {}

  // ** Public API **

  public getDtoList(data: { ids: number[], clientId: number, statuses: string[] }): TaskDto[] {
    let result: TaskDto[] = this.taskList.slice();
    if (Array.isArray(data.ids) && data.ids.length > 0) {
      result = result.filter(item => data.ids.includes(item.id));
    }
    if (data.clientId != null) {
      result = result.filter(item => item.clientId === data.clientId);
    }
    if (Array.isArray(data.statuses) && data.statuses.length > 0) {
      result = result.filter(item => data.statuses.includes(item.status));
    }
    return result;
  }

  public getDto(id: number): TaskDto {
    let result = null;
    const clone: TaskDto[] = this.taskList.slice();
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
        const index = this.taskList.findIndex(item => item.id === id);
        if (index > -1) {
          this.taskList.splice(index, 1);
        }
      }
    }
    return null;
  }

  // ** Privat API **

  private createList(): TaskDto[] {
    const result: TaskDto[] = [];
    result.push(this.create(1, 1, 'PepsiCo'));
    result.push(this.create(2, 1, 'Humana'));
    result.push(this.create(3, 2, 'AbbVie Inc'));
    result.push(this.create(4, 2, 'Archer Daniels'));
    result.push(this.create(5, 3, 'Albertsons'));
    result.push(this.create(6, 3, 'Lockheed'));
    result.push(this.create(7, 4, 'Energy Transfer'));
    result.push(this.create(8, 4, 'Goldman Sachs'));
    result.push(this.create(9, 5, 'Caterpillar'));
    result.push(this.create(10, 5, 'Pfizer'));

    result.push(this.create(11, 6, 'Healthcare'));
    result.push(this.create(12, 6, 'American Express'));
    result.push(this.create(13, 7, 'Delta Air Lines'));
    result.push(this.create(14, 7, 'Merck & Co'));
    result.push(this.create(15, 8, 'Allstate'));
    result.push(this.create(16, 8, 'New York Life'));
    result.push(this.create(17, 9, 'Bestbuy	Retail'));
    result.push(this.create(18, 9, 'United Airlines'));
    result.push(this.create(19, 10, 'Liberty Mutual'));
    result.push(this.create(20, 10, 'Chemical Company'));

    result.push(this.create(21, 11, 'Tyson Foods'));
    result.push(this.create(22, 11, 'General Dynamics'));
    result.push(this.create(23, 12, 'John Deere'));
    result.push(this.create(24, 12, 'Publix'));
    result.push(this.create(25, 13, 'Tech Data'));
    result.push(this.create(26, 13, 'World Fuel'));
    result.push(this.create(27, 14, 'Honeywell'));
    result.push(this.create(28, 15, 'Exelon'));
    result.push(this.create(29, 16, 'Capital One'));
    result.push(this.create(30, 17, 'Plains GP'));
    return result;
  }

  private multiplicityByTwo(id: number, value1: string, value2: string): string {
    return (id % 2 === 0 ? value1 : value2);
  }

  private multiplicityByThree(id: number, value1: string, value2: string, value3: string): string {
    return (id % 3 === 0 ? value1 : this.multiplicityByTwo(id, value2, value3));
  }

  private create(id: number, clientId: number, name: string): TaskDto {
    const id2 = id + 1;
    const msg1 = 'Clarify the contract for the company';
    const msg2 = 'Offer a contract for the company';
    const msg3 = 'Extend the contract for the company';
    const k = id % 4;
    const n = id % 10;
    const d2 = new Date('2020.' + (6 + (id % 2 === 0 ? -k : k)) + '.' + (15 + (id % 2 === 0 ? -n : n)));
    return {
      id,
      clientId,
      subject: this.multiplicityByThree(id2, 'Clarify the contract', 'Offer a contract', 'Extend the contract') + ' "' + name + '"',
      description: this.multiplicityByThree(id2, msg1, msg2, msg3) + ' "' + name + '"',
      message: this.multiplicityByTwo(id2, '', 'Message for "' + name + '".'),
      status: this.multiplicityByTwo(id2, 'not active', 'active'),
      startDate: d2.toISOString(),
      endDate: '',
      warning: this.multiplicityByThree(id2, '', 'Warning for "' + name + '" !', ''),
      error: this.multiplicityByThree(id2, 'Warning for "' + name + '" !!!', '', '')
    };
  }
}
