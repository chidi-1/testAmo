import {showLoadError, showLoadSuccess} from "./functions";

export class AmoCrmApi {
    private baseUrl: string;
    private token: string;

    constructor(baseUrl: string, token: string) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    async delay(time: number) {
        return new Promise(res => {
            setTimeout(res, time)
        })
    }

    async* fetchDeals() {
        let page = 1;
        let response;

        while (true) {
            try {
                response = await fetch(`${this.baseUrl}/api/v4/leads?limit=3&page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
            } catch {
                showLoadError()
                break;
            }

            if (response.status === 204) {
                showLoadSuccess()
                break
            }

            const data = await response.json();

            for (const deal of data._embedded.leads) {
                yield deal;
            }

            page++;

            if (!data._links.next) {
                showLoadSuccess();
                break
            }

            await this.delay(1000);
        }
    }

    async fetchDealDetails(id: number): Promise<any> {
        let response

        try {
            response = await fetch(`${this.baseUrl}/api/v4/leads/${id}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
        } catch {
            showLoadError();
        }

        if (response.status !== 200) {
            showLoadError()
        } else {
            const data = await response.json();
            return data;
        }
    }
}
