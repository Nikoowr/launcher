export type SignInServiceDto = {
  password: string;
  user: string;
};

export interface SignInService {
  execute(dto: SignInServiceDto): Promise<void>;
}
