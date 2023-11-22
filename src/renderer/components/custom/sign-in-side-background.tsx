import SideImageBackground from '../../../../assets/sign-in-side.gif';

export const SignInSideBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-zinc-900">
      <img
        src={SideImageBackground}
        className="h-full w-full object-cover "
        alt="Side Image GF Chaos"
      />
    </div>
  );
};
