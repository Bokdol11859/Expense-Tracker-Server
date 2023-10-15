import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ExpenseService {
  private expenses: Expense[] = [];
  create(createExpenseDto: CreateExpenseDto): Expense {
    const expense = {
      id: randomUUID(),
      ...createExpenseDto,
    };
    this.expenses.push(expense);
    console.log(this.expenses);
    return expense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: string) {
    return this.expenses.find((expense) => expense.id === id);
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const targetIndex = this.expenses.findIndex((expense) => expense.id === id);
    this.expenses[targetIndex] = {
      ...this.expenses[targetIndex],
      ...updateExpenseDto,
    };
    console.log(this.expenses[targetIndex]);
    return this.expenses[targetIndex];
  }

  remove(id: string) {
    const targetIndex = this.expenses.findIndex((expense) => expense.id === id);
    this.expenses.splice(targetIndex, 1);

    return this.expenses;
  }
}
