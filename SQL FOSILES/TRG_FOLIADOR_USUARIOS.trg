CREATE OR REPLACE TRIGGER trg_foliador_usuarios
BEFORE INSERT ON fosiles.usuarios
FOR EACH ROW

BEGIN
    
    :NEW.id_usuario := usuario_id.nextval;
    
END;