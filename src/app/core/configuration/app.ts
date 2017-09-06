import { environment } from '../../../environments/environment';

export class AppSettings {
    public static API_ENDPOINT = `${environment.API_URL}/api/`;
    public static APP_NAME = 'Mcms Admin';
    public static APP_VERSION = '1.0.0';
}