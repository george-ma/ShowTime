export class Show {
    static numShows : number = 0;

    constructor (
        public id: number,
        public title: string,
        public description: string,
        public approved: boolean,
        public img?: string,
        public link?: string,
        public airDate?: Date,
        public airInterval?: number        
    ) {
        Show.numShows++;
    }
}
