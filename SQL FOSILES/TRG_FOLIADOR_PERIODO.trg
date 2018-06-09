CREATE OR REPLACE TRIGGER trg_foliador_periodo
BEFORE INSERT OR UPDATE OF id_periodo ON fosiles.periodos
FOR EACH ROW

BEGIN
    
    :NEW.id_periodo := periodo_id.nextval;
    
END;