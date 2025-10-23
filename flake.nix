{
  description = "Node.js shell with npm";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      systems = nixpkgs.lib.platforms.unix;
      eachSystem =
        f:
        nixpkgs.lib.genAttrs systems (
          system:
          f (
            import nixpkgs {
              inherit system;
              config = { };
              overlays = [ ];
            }
          )
        );
    in
    {
      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22 # choose nodejs_20, nodejs_18, etc.
            typescript
          ];
        };
      });
      apps = eachSystem (
        pkgs:
        let
          start = {
            type = "app";
            program = "${pkgs.writeShellScript "run-server" ''
              npm --prefix ./server run dev > /dev/null 2>&1 &
              npm --prefix ./web run dev > /dev/null 2>&1 &
            ''}";
          };
        in
        {
          default = start;
          inherit start;
          stop = {
            type = "app";
            # TODO: find a better solution
            program = "${pkgs.writeShellScript "stop-server" ''
              pkill -f npm
            ''}";
          };
        }
      );
    };
}
