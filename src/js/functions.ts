export function formattedDate(d:number):string {
    const date = new Date(d * 1000)
    return [date.getDate(), date.getMonth()+1, date.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('.');
}

export interface DealCommonData {
    id: number;
    name: string;
    price: number;
}

export function crateDealCommonHtml (data:DealCommonData):string {
        return `<tr id="deal-${data.id}" class="deal">
                <td><span>Id</span><br/> ${data.id}</td>
                <td><span>Название</span><br/> ${data.name}</td>
                <td><span>Бюджет</span><br/> ${data.price} ₽</td>
                <td></td>
            </tr>`;
}

interface DealDetailData {
    id: number;
    name: string;
    closest_task_at: number;
    taskStatusColor: string;
}

export function crateDealDetailHtml (data:DealDetailData):string {
    return `<tr id="deal-${data.id}" class="deal"
            <td><span>Id</span><br/> ${data.id}</td>
            <td><span>Название</span><br/> ${data.name}</td>
            <td><span>Дата</span><br/> ${formattedDate(data.closest_task_at)}</td>
            <td><span>Статус</span><br/> <svg viewBox="0 0 20 20" class="circle-status"><circle cx="10" cy="10" r="10" fill="${data.taskStatusColor}" /></svg></td>
        </tr>`;
}

export function getTaskStatusColor(taskDate: number): string {
    const now = new Date();

    if (!taskDate || new Date(taskDate * 1000) < now) {
        return 'red'; // Если нет задачи или она просрочена
    } else if (new Date(taskDate * 1000).toLocaleDateString() === now.toLocaleDateString()) {
        return 'green'; // Задача сегодня
    } else {
        return 'yellow'; // Задача в будущем
    }
}

export function showLoadError() {
    let statusContainer = document.querySelector('#loading-status');
    statusContainer.classList.remove('success');
    statusContainer.classList.add('error');
    statusContainer.textContent = 'Что-то пошло не так, перезагрузите страницу';
}

export function showLoadSuccess() {
    let statusContainer = document.querySelector('#loading-status');
    statusContainer.classList.remove('error');
    statusContainer.classList.add('success');
    statusContainer.textContent = 'Все сделки загружены';
}