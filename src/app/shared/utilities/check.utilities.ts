export class CheckUtilities {
    static checkRequiredField(name: string, value: any) {
        if (!value) {
            throw new Error(`Attribute ${name} is required`);
        }
    }
}