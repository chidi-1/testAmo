import {AmoCrmApi} from "./AmoCrmApi";
import {crateDealCommonHtml, crateDealDetailHtml, DealCommonData, getTaskStatusColor} from "./functions";

export class DealsPage {
    private api: AmoCrmApi;
    private tableBody: HTMLElement;
    detailedDealId: number;
    updating: boolean;

    constructor(api: AmoCrmApi, tableBodyId: string) {
        this.api = api;
        this.tableBody = document.getElementById(tableBodyId)!;
        this.detailedDealId = 0;
        this.updating = false;
    }

    async loadDeals() {
        const deals = this.api.fetchDeals();

        for await (const deal of deals) {
            this.appendDealRow(deal)
        }
    }

    appendDealRow(deal: DealCommonData) {
        this.tableBody.insertAdjacentHTML('beforeend', crateDealCommonHtml(deal));
        const row = document.querySelector(`#deal-${deal.id}`)

        row.addEventListener('click', (e) => {
            !this.updating && this.changeDealData(deal.id)
        });
    }

    async changeDealData(dealId: number) {
        this.updating = true
        // Проверка, что где-то открыты детальные данные и открыты ли они в той строке, на которую кликнули

        if (this.detailedDealId === 0) {
            await this.updateDealData(dealId, true)
        } else {
            if(this.detailedDealId === dealId) {
                await this.updateDealData(dealId, false)
            }
            else {
                await this.updateDealData(this.detailedDealId, false)
                await this.updateDealData(dealId, true)
            }
        }
        this.updating = false
    }

    async updateDealData(dealId: number, delailed: boolean) {
        const dealRow = document.getElementById(`deal-${dealId}`)!;
        dealRow.innerHTML = `<td colspan="3">Загрузка...</td>`;

        // Запрос данных по сделке
        const dealDetails = await this.api.fetchDealDetails(dealId);
        this.detailedDealId = dealId;

        // Обновление данных сделки
        if (delailed) {
            // показать детальные данные
            const taskStatusColor = getTaskStatusColor(dealDetails.closest_task_at);
            dealRow.innerHTML = crateDealDetailHtml(Object.assign(dealDetails, {"taskStatusColor": taskStatusColor}))
            this.detailedDealId = dealId
        } else {
            // показать общие данные
            dealRow.innerHTML = crateDealCommonHtml(dealDetails)
            this.detailedDealId = 0
        }
    }
}




