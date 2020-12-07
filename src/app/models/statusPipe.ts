import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'StatusesPipe'})
export class StatusesPipe implements PipeTransform {
  transform(value: string) {
    switch (value) {
      case "0": {
        return "Клиент";
      };
      case "1": {
        return "Партнер";
      };
      case "2": {
        return "Администратор";
      };
      default: {
        "Не найдено"
      };
    }
    return "Не найдено"
  }
}