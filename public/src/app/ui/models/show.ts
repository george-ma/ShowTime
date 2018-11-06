export class Show {
    constructor (
        public id: number,
        public title: string,
        public description: string,
        public approved: boolean,
        public img?: string,
        public link?: string
    ) {}
}
