import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginDetails } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5300/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: LoginDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/fetch-all`);
  }

  fetchSingleUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  switchRole(userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/switch-role`, { user_id: userId });
  }

  updateUserDetails(userId: string, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, user);
  }
}
